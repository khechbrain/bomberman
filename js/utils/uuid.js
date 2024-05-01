export function generateUUID() {
    // UUID v4 template: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0; // Random 0-15
        var v = c === 'x' ? r : (r & 0x3 | 0x8); // Ensure the variant bit
        return v.toString(16); // Convert to hexadecimal
    });
}