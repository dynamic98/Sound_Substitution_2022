export function AbsolutePosition(FourBeatTime){
    let BaseBeatTime = 3200;
    let BaseVisualizationTimer = 190;
    return BaseVisualizationTimer*FourBeatTime/BaseBeatTime
}