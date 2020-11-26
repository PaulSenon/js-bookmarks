window.__cls = 0;
new PerformanceObserver((entryList) => {  
    for (const entry of entryList.getEntries()) {    
        if (!entry.hadRecentInput) {      
            window.__cls += entry.value;  
            let level = 'minor';
            if (entry.value < 0.001) {
                level = 'nice-to-fix';
            } else if (entry.value < 0.01){
                level = 'HIGH';
            } else if (entry.value < 0.1){
                level = 'IMPORTANT';
            } else {
                level = 'CRITICAL';
            }
            const getChangePercentage = (before, after) => {
                if(before === 0){
                    return after*100;
                }
                return -100+(after/(before/100));
            };

            const report = {
                totalCls: window.__cls,
                generatedCls: entry.value,
                criticality: level,
                sources: entry.sources.map(s => ({
                    node: s.node,
                    changeAmountPixel: {
                        bottom: -s.previousRect.bottom + s.currentRect.bottom,
                        height: -s.previousRect.height + s.currentRect.height,
                        left: -s.previousRect.left + s.currentRect.left,
                        right: -s.previousRect.right + s.currentRect.right,
                        top: -s.previousRect.top + s.currentRect.top,
                        width: -s.previousRect.width + s.currentRect.width,
                        x: -s.previousRect.x + s.currentRect.x,
                        y: -s.previousRect.y + s.currentRect.y,
                    },
                    changePercentages: {
                        bottom: getChangePercentage(s.previousRect.bottom, s.currentRect.bottom),
                        height: getChangePercentage(s.previousRect.height, s.currentRect.height),
                        left: getChangePercentage(s.previousRect.left, s.currentRect.left),
                        right: getChangePercentage(s.previousRect.right, s.currentRect.right),
                        top: getChangePercentage(s.previousRect.top, s.currentRect.top),
                        width: getChangePercentage(s.previousRect.width, s.currentRect.width),
                        x: getChangePercentage(s.previousRect.x, s.currentRect.x),
                        y: getChangePercentage(s.previousRect.y, s.currentRect.y),
                    }
                })),
                zzz_originalData: entry,
            };
            console.debug(`[${level}] CLS detected! Current CLS =`, window.__cls);        
            for(e of entry.sources){            
                if(e.node === articleSwipe.swiper.wrapperEl){                
                    console.debug('-----> SWIPER CLS :', entry.value);            
                }        
            }    
            console.debug('-----> details :', report);
        }  
    }
}).observe({type: 'layout-shift', buffered: true});