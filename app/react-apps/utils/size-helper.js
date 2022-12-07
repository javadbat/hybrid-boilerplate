function sizeHelper(size) {
    const sizeKB = (size / (1024));
    const sizeMB = (size / (1024 * 1024));
    const sizeGB = (size / (1024 * 1024 * 1024));

    return (
        {
            sizekb: sizeKB,
            sizemb: sizeMB,
            sizegb: sizeGB,
        }
    );
}
function getSizeHelper(size) {
    const sizes = sizeHelper(size);
    if (size < 1048576) {
        return sizes.sizekb.toFixed(2) + ' کیلوبایت';
    } else if (size < 1073741824) {
        return sizes.sizemb.toFixed(2) + ' مگابایت';
    } else {
        return sizes.sizegb.toFixed(2) + ' گیگابایت';
    }
}

export { sizeHelper, getSizeHelper };
