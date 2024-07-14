const READ = 0b00001; // 读
const WRITE = 0b00010;// 写
const SHARE = 0b00100;// 分享
const DELETE = 0b01000;// 删除
const CREATE = 0b10000;// 创建

// perm拥有这些权限。
const perm = READ | SHARE | WRITE;
// READ | SHARE | WRITE 0b00111

// 删除读的权限
const removeRead = perm & ~READ;
// ~READ 0b11110
// 结果： 0b11111


// 判断是否存在可读权限
console.log((removeRead & READ) === READ, '判断是否存在可读权限')

// 判断是否有可读权限
console.log((perm & READ) === READ, '判断是否有可读权限')



// 解释：
const a = 0b0000000000000000000000000000001;
const b = 0b0000000000000000000000000000011;
// 位  与  运算
console.log(a & b);
// 0b000000000000000000000000000001 得到的二进制 结果：1
// 位  或  运算
console.log(a | b);
// 0b000000000000000000000000000011 二进制值如果a、b有1，就显示1 结果：3
// 位  非  运算
console.log(~b);
// 0b111111111111111111111111111100 二进制反转  结果：-4
