'use client'
import React from 'react'
import {useState} from 'react'

const Main = () => {
    const [url, setURL] = useState({link: ""});
    const [CrawlData, setCrawlData] = useState([])

    const handleChange = async (e) => {
        e.preventDefault()
        setURL({...url, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await fetch('http://localhost:8000/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: await JSON.stringify(url)
        })
        
        const data = await resp.json()

        setCrawlData(data)
    }

  return (
    <div>
        <div className='bg-violet-950 pt-24 text-gray-100'>
            <div className='p-4 pb-2 font-bold text-xl flex justify-center items-center gap-2'>
                {/* <Image width={75} height={75} unoptimized src="/logo.gif" alt="" /> */}
                <h1 className='text-3xl'>WebCrawler:  Crawl Your Websites</h1>
            </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center  gap-3 p-3'>
                    <input className='text-violet-950 text-center p-1 w-96 border-4 border-violet-800 rounded-md outline-none' type="text" value={url.link} name="link" onChange={(e)=>{handleChange(e)}}/>
                    <button type='submit' className='p-2 bg-violet-800 w-20 rounded-2xl outline-none'>Crawl</button>
                </form>
            <p className='text-center text-xl pb-16'>Click here to Upload your Url and get the Crawl</p>
        </div>
        
        <div className='p-20'>
            <p className='text-gray-500 text-xl text-center container mx-auto w-[80vh] pb-10'>Discover the pinnacle answer for effortless and effective crawling of websites from the web: our WebCrawler. This intuitive, no-cost utility streamlines the task of acquiring your SEO data with just one simple click, guaranteeing a smooth and hassle-free journey!</p>
        </div>
        <div className='min-h-[50vh] bg-violet-950 pt-16 text-gray-100'>
            <div className='pb-2 font-bold text-xl flex justify-center items-center gap-2'>
                <h2 className='text-3xl'>Get Your Crawl Here</h2>
            </div>
            <div className='min-h-[40vh] font-bold flex justify-center gap-2'>
                {CrawlData.length == 0  && <h1 className='text-xl p-7'>No Url Uploaded</h1>}
                {CrawlData.length != 0 && <div className='font-bold flex flex-col gap-2 p-5'>
                    {Object.keys(CrawlData).map((keyname, keyindex) => {
                        return(<div key={keyname} className='flex justify-between mb-8'>
                            <p className='w-[50%]'>{keyname}:-</p>
                            <div className='w-[50%] flex flex-col gap-1'>
                                {CrawlData[keyname].map((items) =>{
                                    return(
                                        <p>{items}</p>
                                    )
                                })}
                            </div>
                        </div>)
                    })}
                </div>}
            </div>
        </div>
    </div>


  )
}

export default Main
