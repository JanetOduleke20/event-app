import React from 'react'
import '../App.css'

export default function ProgressBar() {
  return (
    <div className='progressBar mx-auto w-50'>
        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-danger w-50" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            <span className='mx-auto'>Loading</span>
        </div>
    </div>
  )
}
