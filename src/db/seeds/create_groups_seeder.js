export const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("groups").del();
  
    // Inserts seed entries
    await knex("groups").insert([
        { g_key:'singleStandard', g_name: 'demo\\Nostro\\U-SST-1-B' },
        { g_key:'singleAggressive', g_name: 'demo\\Nostro\\U-SAG-1-B' },
        { g_key:'doubleStandard1', g_name: 'demo\\Nostro\\U-DST-1-B' },
        { g_key:'doubleStandard2', g_name: 'demo\\Nostro\\U-DST-2-B' },
        { g_key:'doubleAggressive1', g_name: 'demo\\Nostro\\U-DAG-1-B' },
        { g_key:'doubleAggressive2', g_name: 'demo\\Nostro\\U-DAG-2-B' },
        { g_key:'tripleStandard1', g_name: 'demo\\Nostro\\U-TPS-1-B' },
        { g_key:'tripleStandard2', g_name: 'demo\\Nostro\\U-TPS-2-B' },
        { g_key:'tripleStandard3', g_name: 'demo\\Nostro\\U-TPS-3-B' },
        { g_key:'tripleAggressive1', g_name: 'demo\\Nostro\\U-TPA-1-B' },
        { g_key:'tripleAggressive2', g_name: 'demo\\Nostro\\U-TPA-2-B' },
        { g_key:'tripleAggressive3', g_name: 'demo\\Nostro\\U-TPA-3-B' },
        { g_key:'freeTrial', g_name: 'demo\\Nostro\\U-FTE-1-B' },
        { g_key:'freeTrial2', g_name: 'demo\\Nostro\\U-FTE-2-B' },
        { g_key:'freeTrial3', g_name: 'demo\\Nostro\\U-FTE-3-B' },
        { g_key:'freeTrialFunded', g_name: 'demo\\Nostro\\U-FTF-1-B' },
        { g_key:'freeTrialFundedA', g_name: 'demo\\Nostro\\U-FTF-1-A' },
        { g_key:'competitionsFree', g_name: 'demo\\Nostro\\U-COF-1-B' },
        { g_key:'competitionsPaid', g_name: 'demo\\Nostro\\U-COP-1-B' },
        { g_key:'singleStandardFunded', g_name: 'demo\\Nostro\\U-SSF-1-B' },
        { g_key:'singleStandardFundedA', g_name: 'demo\\Nostro\\U-SSF-1-A' },
        { g_key:'singleAggressiveFunded', g_name: 'demo\\Nostro\\U-SAF-1-B' },
        { g_key:'singleAggressiveFundedA', g_name: 'demo\\Nostro\\U-SAF-1-A' },
        { g_key:'doubleStandardFunded', g_name: 'demo\\Nostro\\U-DSF-1-B' },
        { g_key:'doubleStandardFundedA', g_name: 'demo\\Nostro\\U-DSF-1-A' },
        { g_key:'doubleAggressiveFunded', g_name: 'demo\\Nostro\\U-DAF-1-B' },
        { g_key:'doubleAggressiveFundedA', g_name: 'demo\\Nostro\\U-DAF-1-A' },
        { g_key:'tripleStandardFunded', g_name: 'demo\\Nostro\\U-TSF-1-B' },
        { g_key:'tripleStandardFundedA', g_name: 'demo\\Nostro\\U-TSF-1-A' },
        { g_key:'tripleAggressiveFunded', g_name: 'demo\\Nostro\\U-TAF-1-B' },
        { g_key:'tripleAggressiveFundedA', g_name: 'demo\\Nostro\\U-TAF-1-A' }
    ]
    );
  };
  