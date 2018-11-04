module.exports = {
    tooltip:{
            // headerFormat: '<b>{point.key}</b><br>',
            // pointFormat: '{}{point.y} %',
            formatter: function() {
                let demographicText = this.point.name?' are '+this.point.name:'';
                return `<b>${this.point.id}</b><br/>`+
                `${this.point.y}% of voters for Answer ${this.point.id}`+
                demographicText;
            },
            backgroundColor:'black',
            style:{
                fontFamily:'Play',
                backgroundColor:'rgb(10,2,8,0.6)',
                color:'#ffffff'
            }
    },
    style:{
    },
    plotOptions: {
            column: {
                dataLabels: {
                    format: '{y}%',
                    enabled: true,
                    overflow: 'allow',
                    crop: false,
                    style: {
                    fontFamily:'Play',
                    fontSize: '1em'
                }
            },
        },
        bar:{
            dataLabels: {
                    format: '{y}%',
                    enabled: true,
                    overflow: 'allow',
                    crop: false,
                    style: {
                    fontFamily:'Play',
                    fontSize: '1em'
                }
            }
        },
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
        }
    }
}