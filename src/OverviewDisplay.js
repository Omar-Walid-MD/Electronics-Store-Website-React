import featureImgList from "./img/export.js"
import { useEffect, useState } from 'react';

function OverviewDisplay()
{
    const featureList = [
        {
          img: featureImgList[0],
          desc: "First First First First",
        },
        {
          img: featureImgList[1],
          desc: "Second Second Second Second",
        },
        {
          img: featureImgList[2],
          desc: "Third Third Third Third",
        },
        {
          img: featureImgList[3],
          desc: "Fourth Fourth Fourth Fourth",
        },
      ];
    
      const [featureindex,setFeatureIndex] = useState(0);
    
      function handleFeatureIndex()
      {
        if(featureindex===0)
        {
          setFeatureIndex(3);
        }
        else
        {
          setFeatureIndex(x => x - 1);
        }
      }
    
      function updateFeatureIndex()
      {
        setTimeout(() => {
          handleFeatureIndex();
        }, 4000);
      }
    
      function getFeaturePanels()
      {
        let resultList = [];
        for (const key in featureList)
        {
          const k = parseInt(key)
    
          if(k === featureindex)
          {
            
            if(k===0)
            {
              resultList.push(featureList[featureList.length-1],featureList[0],featureList[1]);
            }
            else if(k===featureList.length-1)
            {
              resultList.push(featureList[featureList.length-2],featureList[featureList.length-1],featureList[0]);
            }
            else
            {
              resultList.push(featureList[k-1],featureList[k],featureList[k+1]);
            }
              
            break;
          }    
        }
        return resultList
      }
      
     
      useEffect(()=>{
    
        updateFeatureIndex();

        // return console.log("re-rendered");
    
      },[featureindex]);

      function makeId(length) {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
      }

    return (
        <section className="overview-section-container">
          <h1 className="overview-section-title">Store Title</h1>
          <div className="feature-panels">
            {
              getFeaturePanels().map((feature,index)=>
              <div className="feature-panel-container" order={index} key={index}>
                  <div className="feature-panel" key={makeId(3)}>
                    <img className="feature-image" src={feature.img} alt="feature"/>
                    <div className="feature-desc">{feature.desc}</div>
                  </div>
              </div>
              )
            }
            
          </div>
        </section>
    )
}

export default OverviewDisplay;