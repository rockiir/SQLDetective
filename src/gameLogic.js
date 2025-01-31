import { databases } from './databases';

export const executeQuery = (queryString) => {
    try {
        const sanitizedQuery = queryString.replace(/[;.]/g, '').toLowerCase().trim();

        if (sanitizedQuery.startsWith('select')) {
            const [, selectPart, , fromPart] = sanitizedQuery.split(' ');
            const table = fromPart.trim().split(' ')[0];

            if (!databases[table]) {
                return {
                    success: false,
                    message: `Table "${table}" not found.`
                };
            }

            let results;
            if (selectPart === '*') {
                results = databases[table];
            } else {
                const columns = selectPart.split(',').map(col => col.trim());
                results = databases[table].map(row =>
                    Object.fromEntries(
                        columns.map(col => [col, row[col]])
                    )
                );
            }

            if (sanitizedQuery.includes('where')) {
                const whereClause = sanitizedQuery.split('where')[1].trim();
                const [column, operator, value] = whereClause.split(/\s+/);

                results = results.filter(row => {
                    const cellValue = row[column];
                    const compareValue = value.replace(/'/g, '');

                    switch (operator) {
                        case '>':
                            return parseFloat(cellValue) > parseFloat(compareValue);
                        case '<':
                            return parseFloat(cellValue) < parseFloat(compareValue);
                        case '=':
                            return cellValue === compareValue;
                        case 'like':
                            return cellValue.toString().toLowerCase().includes(compareValue.toLowerCase());
                        default:
                            return false;
                    }
                });
            }

            return {
                success: true,
                message: "Query executed successfully!",
                data: results
            };
        } else {
            return {
                success: false,
                message: "Only SELECT queries are allowed."
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Query execution error: ${error.message}`
        };
    }
};