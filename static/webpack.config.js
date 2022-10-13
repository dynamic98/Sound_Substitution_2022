const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // sourcce file location
    entry: {
        abstract: path.resolve(__dirname, "src", "js", "main.js"),
        exploration: path.resolve(__dirname, "src", "js", "Exploration.js"),        
        pianotask: path.resolve(__dirname, "src", "js", "pianoTask.js"),
        makepiano: path.resolve(__dirname, "src", "js", "MakePiano.js"),
        drumtask: path.resolve(__dirname, "src", "js", "drumTask.js"),
        makedrum: path.resolve(__dirname, "src", "js", "MakeDrum.js"),
        Task_dev: path.resolve(__dirname, "src", "js", "Task_dev.js"),      

        Exploration_task_one_drum: path.resolve(__dirname, "src", "js", "Exploration_sample1_drum.js"),   
        Exploration_task_two_piano: path.resolve(__dirname, "src", "js", "Exploration_sample2_piano.js"),   
        Exploration_task_three_drum: path.resolve(__dirname, "src", "js", "Exploration_sample3_drum.js"),   
        Exploration_task_four_piano: path.resolve(__dirname, "src", "js", "Exploration_sample4_piano.js"),   
        Exploration_task_five_piano: path.resolve(__dirname, "src", "js", "Exploration_sample5_piano.js"),   
        Exploration_task_six_piano: path.resolve(__dirname, "src", "js", "Exploration_sample6_piano.js"),   
        Exploration_task_seven_piano: path.resolve(__dirname, "src", "js", "Exploration_sample7_piano.js"),   
        Exploration_task_eight_piano: path.resolve(__dirname, "src", "js", "Exploration_sample8_piano.js"),  

        Information_test_A: path.resolve(__dirname, "src", "js", "Information_Test_GroupA.js"),   
        Information_test_B: path.resolve(__dirname, "src", "js", "Information_Test_GroupB.js"),   
        Information_test_C: path.resolve(__dirname, "src", "js", "Information_Test_GroupC.js"),   
        Information_test_D: path.resolve(__dirname, "src", "js", "Information_Test_GroupD.js"),   

        //concrete: path.resolve(__dirname, "src", "concrete.js")
    },
    mode: "development",
    target: "web",
    output: {
        path: path.resolve(__dirname, "src", "js", "dist"),
        filename: '[name].js'
    },
   
    plugins: [new HTMLWebpackPlugin({})],
};