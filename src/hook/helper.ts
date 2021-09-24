import { ColumnProps, ImageProps, UserProps } from '../store/index'

export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

interface CheckCondition {
  format?: string[];
  size?: number;
}
// 声明错误类型
type ErrorType = 'size' | 'format' | null
// 验证上传文件的大小和格式是否合法
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

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}
