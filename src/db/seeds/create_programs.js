export const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("programs").del();
    const prgrams = [
        {
            'group_key':'freeTrial',
            'stage':'trial',
            'type':'standard',
            'prices': JSON.stringify({'5000': 0}),
            'account_leverage':30,
            'profit_split':85,
            'profit_target': JSON.stringify([6, 6, 6]),
            'daily_drawdown':3,
            'max_drawdown':6
        },
        {
            'group_key':'singleStandard',
            'stage':'single',
            'type':'standard',
            'prices': JSON.stringify({2500: 21,5000: 38,10000: 79,25000: 230,50000: 360,100000: 640}),
            'account_leverage':100, 
            'profit_split':85,
            'profit_target': JSON.stringify([10]),
            'daily_drawdown':4,
            'max_drawdown':6
        },
        {
            'group_key':'singleAggressive',
            'stage':'single',
            'type':'aggressive',
            'prices': JSON.stringify({2500: 25,5000: 45,10000: 110,25000: 260,50000: 409,100000: 699}),
            'account_leverage':100, 
            'profit_split':85,
            'profit_target': JSON.stringify([10]),
            'daily_drawdown':5,
            'max_drawdown':10
        },
        {
            'group_key':'doubleStandard1',
            'stage':'double',
            'type':'standard',
            'prices': JSON.stringify({2500: 13,5000: 22,10000: 69,25000: 190,50000: 310,100000: 479}),
            'account_leverage':100, 
            'profit_split':85, 
            'profit_target': JSON.stringify([8,5]),
            'daily_drawdown':5,
            'max_drawdown':10
        },
        {
            'group_key':'doubleAggressive1',
            'stage':'double',
            'type':'aggressive',
            'prices': JSON.stringify({2500: 19,5000: 34,10000: 88,25000: 210,50000: 350,100000: 520}),
            'account_leverage':100, 
            'profit_split':85, 
            'profit_target': JSON.stringify([8,5]),
            'daily_drawdown':6,
            'max_drawdown':12
        },
        {
            'group_key':'tripleStandard1',
            'stage':'triple',
            'type':'standard',
            'prices': JSON.stringify({10000: 22,25000: 120,50000: 200,100000: 349}),
            'account_leverage':100, 
            'profit_split':85, 
            'profit_target': JSON.stringify([8,5,5]),
            'daily_drawdown':5,
            'max_drawdown':10
        },
        {
            'group_key':'tripleAggressive1',
            'stage':'triple',
            'type':'aggressive',
            'prices': JSON.stringify({10000: 39,25000: 140,50000: 280,100000: 439}),
            'account_leverage':100, 
            'profit_split':85, 
            'profit_target': JSON.stringify([8,5,5]),
            'daily_drawdown':6,
            'max_drawdown':12
        }
    ];
    // Inserts seed entries
    await knex("programs").insert(prgrams);
  };
  