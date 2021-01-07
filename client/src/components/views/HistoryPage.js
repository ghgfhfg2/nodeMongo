import React, { useEffect } from 'react'
import { ContentBox } from './CheckPage'
import axios from 'axios'

function HistoryPage() {
    useEffect(() => {
    },[])
    return (
        <>
            <ContentBox>
                <ul className="myinfo">
                    <li>
                    <div>
                        <span className="date">2020.12.17(목)</span>
                        <span className="choice">type1</span>
                    </div>
                    <p>내용</p>
                    </li>
                    <li>
                    <div>
                        <span className="date">2020.12.17(목)</span>
                        <span className="choice">type1</span>
                    </div>
                    <p>내용</p>
                    </li>
                </ul>
            </ContentBox>
        </>
    )
}

export default HistoryPage
