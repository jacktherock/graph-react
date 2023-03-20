import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"

const Piechart = () => {

    const [activity, setActivity] = useState([])
    const [duration, setDuration] = useState([])

    useEffect(() => {
        const tActivity = []
        const tDuration = []

        const getTrackData = async () => {
            const result = await fetch("http://127.0.0.1:8000/api/track/")
            const response = await result.json()
            console.log(response)

            for (let i = 0; i < response.length; i++) {
                tActivity.push(response[i].activity)
                tDuration.push(parseFloat(response[i].duration))
            }
            setActivity(tActivity)
            setDuration(tDuration)
        }
        
        getTrackData()
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">
                <h3>Piechart</h3>
                <Chart
                    type="pie" width={1349} height={550} series={duration} options={{
                        title: { text: "Tracks Piechart" },
                        noData: { text: "No Data Available" },
                        labels: activity
                    }}
                >

                </Chart>
            </div>
        </React.Fragment>
    )
}

export default Piechart