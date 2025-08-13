"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function EMICalculator() {
  // ---------- STATE VARIABLES ----------
  const [loanAmount, setLoanAmount] = useState<number>(500000); // Loan amount in ₹
  const [tenure, setTenure] = useState<number>(5); // Loan tenure in years
  const [interestRate, setInterestRate] = useState<number>(8.5); // Annual interest rate in %
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Active bar index in chart

  // ---------- CALCULATE EMI ----------
  const calculateEMI = () => {
    const principal = loanAmount;
    const annualRate = interestRate;
    const monthlyRate = annualRate / 12 / 100;
    const months = tenure * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const interestAmount = totalPayment - principal;

    return {
      emi: emi.toFixed(2),
      total: totalPayment.toFixed(2),
      interest: interestAmount.toFixed(2),
      principal: principal.toFixed(2),
    };
  };

  const result = calculateEMI();

  // ---------- BAR CHART DATA ----------
  const data = [
    { name: "Principal", value: +result.principal },
    { name: "Interest", value: +result.interest },
    { name: "Total", value: +result.total },
  ];

  // Chart bar colors
  const colors = ["#3f3f46", "#6366f1", "#eab308"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] via-[#f0f1fc] to-[#e6e8f7] font-sans relative">

      {/* ---------- NAVBAR ---------- */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 px-6 py-3 flex items-center justify-between shadow-md">
        {/* Logo + Title */}
        <a
          href="https://www.gharpadharo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.webp"
            alt="Ghar Padharo Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold text-[#4B3F72]">GharPadharo</h1>
        </a>

        {/* Navbar Links */}
        <ul className="flex space-x-4 text-sm font-medium text-gray-600">
          <li>
            <a
              href="https://www.gharpadharo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600"
            >
              Home
            </a>
          </li>
          <li className="hover:text-purple-600 cursor-pointer">Calculator</li>
          <li>
            <a
              href="https://www.gharpadharo.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600"
            >
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* ---------- PAGE CONTENT ---------- */}
      <div className="pt-20 p-4 relative overflow-hidden">

        {/* Wave Background (Visible on all devices) */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <img
            src="/Screenshot 2025-08-08 182655.png"
            alt="wave background"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col space-y-4">

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-[#4B3F72]">
            EMI Calculator
          </h1>

          {/* ---------- LAYOUT: Input + Results/Chart ---------- */}
          <div className="flex flex-col md:flex-row flex-1 gap-4 overflow-hidden">

            {/* ---------- INPUT SECTION ---------- */}
            <div className="w-full md:w-1/4 h-[275px] rounded-xl bg-white shadow-xl p-4 space-y-4">
              
              {/* Loan Amount */}
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">
                  Loan Amount
                </label>
                <input
                  type="number"
                  className="w-full bg-white text-black border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>

              {/* Tenure */}
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">
                  Tenure (in years)
                </label>
                <input
                  type="number"
                  className="w-full bg-white text-black border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block mb-1 font-medium text-sm text-gray-700">
                  Interest Rate (p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full bg-white text-black border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
            </div>

            {/* ---------- RESULTS & CHART ---------- */}
            <div className="flex-1 grid grid-rows-[auto_1fr] gap-3">

              {/* Results Section */}
              <div className="bg-white p-3 rounded-xl shadow-xl">
                <h2 className="text-lg font-semibold text-[#4B3F72] border-b pb-1">
                  Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Monthly EMI</p>
                    <p className="text-lg font-bold text-[#4B3F72]">
                      ₹ {result.emi}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Interest</p>
                    <p className="text-lg font-bold text-[#4B3F72]">
                      ₹ {result.interest}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Payment</p>
                    <p className="text-lg font-bold text-[#4B3F72]">
                      ₹ {result.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-4 rounded-xl shadow-xl">
                <h2 className="text-lg font-semibold text-[#4B3F72] mb-1 border-b pb-1">
                  Breakdown
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={data}
                    onMouseMove={(e) =>
                      setActiveIndex(Number(e?.activeTooltipIndex ?? -1))
                    }
                    onMouseLeave={() => setActiveIndex(-1)}
                  >
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="value" barSize={40} radius={[8, 8, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                          stroke="#1e293b"
                          strokeWidth={activeIndex === index ? 3 : 0}
                          style={{
                            filter:
                              activeIndex === index
                                ? "drop-shadow(0 6px 12px rgba(0,0,0,0.25))"
                                : "none",
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
