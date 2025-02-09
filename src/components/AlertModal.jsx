import React from 'react'

const AlertModal = ({content, confirmBtn, onCancel, onConfirmRemoved }) => {
  return (
    <div className='alert-modal'>{content}
    {confirmBtn&& 
    <>
      <div className='alert-modal-bg'></div>
      <div className='confirm-panel'>
        {/* 點擊防止事件冒泡 並執行回調函數 */}
        <button className='light-btn' onClick={(e)=>{e.stopPropagation(); onCancel()}}>Cancel</button>
        <button className='light-btn' onClick={(e)=>{e.stopPropagation(); onConfirmRemoved()}}>Remove</button>
      </div>
    </>
      }
    </div>
  )
}

export default AlertModal