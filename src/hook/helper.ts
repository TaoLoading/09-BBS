/**
 * 验证上传文件的大小和格式是否合法
 */
interface CheckCondition {
  format?: string[];
  size?: number;
}
// 声明错误类型
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  // 校验格式
  const isValidFormat = format ? format.includes(file.type) : true
  // 校验大小
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
