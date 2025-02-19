import { useState } from 'react'

export default function ImageUpload() {
  // 記錄選擇的圖片檔案，特殊物件初始值用null
  const [selectedImg, setSelectedImg] = useState(null)
  // 預覽圖片網址(呼叫URL.createObjectURL後產生的暫時網址)
  const [previewURL, setPreviewURL] = useState('')

  // 呈現伺服器的訊息用的狀態
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    // 需要判斷使用者是否在點開選擇圖片時，按取消按鈕，會返回undefined值
    if (file) {
      setSelectedImg(file)
      // 產生預覽網址
      setPreviewURL(URL.createObjectURL(file))
    } else {
      setSelectedImg(null)
      setPreviewURL('')
    }
  }

  const handleFileUpload = async () => {
    const fd = new FormData()

    // 對照伺服器要接收的檔案欄位名稱，加入要上傳的欄位值
    fd.append('avatar', selectedImg)

    // 傳送到伺服器對應的api路由中，這裡會自動解析為FormData格式
    const res = await fetch('http://localhost:5555/upload-avatar', {
      method: 'POST',
      body: fd,
    })

    // 獲得伺服器回傳的訊息
    const data = await res.json()

    setMessage(JSON.stringify(data))
  }

  return (
    <>
      <h1>圖片預覽與上傳</h1>
      <hr />
      <div>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <button onClick={handleFileUpload}>上傳到伺服器</button>
      </div>
      <div>伺服器回應：{message}</div>
      <div>
        預覽:
        <img src={previewURL} alt="" />
      </div>
    </>
  )
}