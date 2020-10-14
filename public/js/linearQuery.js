const linearQuery = (q)=>{
        
        let t1 = performance.now()
        const matches = []
        data.forEach(faculty => {
                if(faculty.name.beginsWith(q)){
                        matches.push(faculty)
                }
        })

        let t2 = performance.now()

        console.log(`querying finished in ${t2-t1} milliseconds`)
        return {data:matches, time: t2-t1}
}