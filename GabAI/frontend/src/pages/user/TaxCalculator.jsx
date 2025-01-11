import { toast } from "react-toastify";
import CardTax from "../../components/CardTax";
import ProjectedTax from "../../components/ProjectedTax";
import { useState, useContext } from "react";
import { SalaryTaxContext } from "@/contexts/SalaryTaxContext";

function TaxCalculator() {
  const { sssDeductionAmt, setSssDeductionAmt } = useContext(SalaryTaxContext);
  const { gsisDeductionAmt, setGsisDeductionAmt } =
    useContext(SalaryTaxContext);
  const { philHealthDeductionAmt, setPhilHealthDeductionAmt } =
    useContext(SalaryTaxContext);

  const sssLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Social_Security_System_%28SSS%29.svg/1200px-Social_Security_System_%28SSS%29.svg.png";
  const gsisLogo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyQ4xNGBl_tP0kbuD-M_gUMjQnjGEkYx9wG9BYiTI4g&s";
  const philhealthLogo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQimgONmrOviyRl-QecZPDKLx_8boMfkWG0rRGfhuM0BQ&s";
  const taxLogo =
    "https://w7.pngwing.com/pngs/41/420/png-transparent-emoji-money-bag-sticker-take-the-money-cash-emoji-domain-money.png";

  const [formData, setFormData] = useState({
    monthlySalary: "",
    isSssMember: "",
    isGsisMember: "",
    isPhilHealthMember: "",
    finalSalary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSssDeductionAmt('');
    setGsisDeductionAmt('');
    setPhilHealthDeductionAmt('');

    const contri_rate = 0.14;

    let annualSalary = formData.monthlySalary * 12;
    let tax, excess, final, taxedIncome, addOn; // Tax
    let msc, mpf, ec, tmc, final_sss; // Varibles for SSS
    let percent_gsis, final_gsis, total_gsis; // Variables for GSIS
    let ph_total, ph_final; // Variables for PhilHealth

    try {
      if (annualSalary <= 250000) {
        await setFormData({
          ...formData,
          finalSalary: eval(annualSalary / 12),
        });
      } else if (annualSalary <= 400000) {
        tax = 0.15;
        excess = eval(annualSalary - 250000);
        final = eval((excess * tax) / 12);
        taxedIncome = eval(formData.monthlySalary - final);

        setFormData({ ...formData, finalSalary: taxedIncome });
      } else if (annualSalary <= 800000) {
        tax = 0.2;
        excess = eval(annualSalary - 400000);
        final = eval(excess * tax + 22500);
        taxedIncome = eval(final / 12);
        addOn = eval(formData.monthlySalary - taxedIncome);
      } else if (annualSalary <= 2000000) {
        tax = 0.25;
        excess = eval(annualSalary - 800000);
        final = eval(excess * tax + 102500);
        taxedIncome = eval(final / 12);
        addOn = eval(formData.monthlySalary - taxedIncome);
      } else if (annualSalary <= 8000000) {
        tax = 0.3;
        excess = eval(annualSalary - 2000000);
        final = eval(excess * tax + 402500);
        taxedIncome = eval(final / 12);
        addOn = eval(formData.monthlySalary - taxedIncome);
      } else {
        tax = 0.35;
        excess = eval(annualSalary - 8000000);
        final = eval(excess * tax + 2202500);
        taxedIncome = eval(final / 12);
        addOn = eval(formData.monthlySalary - taxedIncome);
      }

      if (formData.isSssMember === "Household") {
        if (formData.monthlySalary <= 5000) {
          setFormData({ ...formData, sssDeductionAmt: 0 });
        } else if (formData.monthlySalary <= 5249.99) {
          msc = 5000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 5749.99) {
          msc = 5500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 6249.99) {
          msc = 6000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 6749.99) {
          msc = 6500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 7249.99) {
          msc = 7000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 7749.99) {
          msc = 7500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 8249.99) {
          msc = 8000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 8749.99) {
          msc = 8500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 9249.99) {
          msc = 9000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 9749.99) {
          msc = 9500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 10249.99) {
          msc = 10000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 10749.99) {
          msc = 10500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 11249.99) {
          msc = 11000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 11749.99) {
          msc = 11500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 12249.99) {
          msc = 12000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 12749.99) {
          msc = 12500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 13249.99) {
          msc = 13000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 13749.99) {
          msc = 13500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 14249.99) {
          msc = 14000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
        } else if (formData.monthlySalary <= 14749.99) {
          msc = 14500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 15249.99) {
          msc = 15000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 15749.99) {
          msc = 15500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 16249.99) {
          msc = 16000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 16749.99) {
          msc = 16500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 17249.99) {
          msc = 17000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 17749.99) {
          msc = 17500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 18249.99) {
          msc = 18000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 18749.99) {
          msc = 18500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 19249.99) {
          msc = 19000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 19749.99) {
          msc = 19500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 20249.99) {
          msc = 20000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 20749.99) {
          msc = 20000;
          ec = 30;
          mpf = 500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 21249.99) {
          msc = 20000;
          ec = 30;
          mpf = 1000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 21749.99) {
          msc = 20000;
          ec = 30;
          mpf = 1500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 22249.99) {
          msc = 20000;
          ec = 30;
          mpf = 2000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 22749.99) {
          msc = 20000;
          ec = 30;
          mpf = 2500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 23249.99) {
          msc = 20000;
          ec = 30;
          mpf = 3000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 23749.99) {
          msc = 20000;
          ec = 30;
          mpf = 3500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 24249.99) {
          msc = 20000;
          ec = 30;
          mpf = 4000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 24749.99) {
          msc = 20000;
          ec = 30;
          mpf = 4500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 25249.99) {
          msc = 20000;
          ec = 30;
          mpf = 5000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 25749.99) {
          msc = 20000;
          ec = 30;
          mpf = 5500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 26249.99) {
          msc = 20000;
          ec = 30;
          mpf = 6000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 26749.99) {
          msc = 20000;
          ec = 30;
          mpf = 6500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 27249.99) {
          msc = 20000;
          ec = 30;
          mpf = 7000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 27749.99) {
          msc = 20000;
          ec = 30;
          mpf = 7500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 28249.99) {
          msc = 20000;
          ec = 30;
          mpf = 8000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 28749.99) {
          msc = 20000;
          ec = 30;
          mpf = 8500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 29249.99) {
          msc = 20000;
          ec = 30;
          mpf = 9000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 29749.99) {
          msc = 20000;
          ec = 30;
          mpf = 9500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
          console.log(sssDeductionAmt);
        } else {
          msc = 20000;
          ec = 30;
          mpf = 10000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        }
      } else if (formData.isSssMember === "Employee") {
        if (formData.monthlySalary <= 4250) {
          msc = 4000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 4749) {
          msc = 4500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 5249.99) {
          msc = 5000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 5749.99) {
          msc = 5500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 6249.99) {
          msc = 6000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 6749.99) {
          msc = 6500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 7249.99) {
          msc = 7000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 7749.99) {
          msc = 7500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 8249.99) {
          msc = 8000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 8749.99) {
          msc = 8500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 9249.99) {
          msc = 9000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 9749.99) {
          msc = 9500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 10249.99) {
          msc = 10000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 10749.99) {
          msc = 10500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 11249.99) {
          msc = 11000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 11749.99) {
          msc = 11500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 12249.99) {
          msc = 12000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 12749.99) {
          msc = 12500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 13249.99) {
          msc = 13000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 13749.99) {
          msc = 13500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 14249.99) {
          msc = 14000;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 14749.99) {
          msc = 14500;
          ec = 10;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 15249.99) {
          msc = 15000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 15749.99) {
          msc = 15500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 16249.99) {
          msc = 16000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 16749.99) {
          msc = 16500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 17249.99) {
          msc = 17000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
        } else if (formData.monthlySalary <= 17749.99) {
          msc = 17500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 18249.99) {
          msc = 18000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 18749.99) {
          msc = 18500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 19249.99) {
          msc = 19000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 19749.99) {
          msc = 19500;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 20249.99) {
          msc = 20000;
          ec = 30;
          tmc = eval(msc * contri_rate + ec);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 20749.99) {
          msc = 20000;
          ec = 30;
          mpf = 500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 21249.99) {
          msc = 20000;
          ec = 30;
          mpf = 1000;
          tmc = eval(eval(msc * contri_rate + ec + mpf * contri_rate));
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 21749.99) {
          msc = 20000;
          ec = 30;
          mpf = 1500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 22249.99) {
          msc = 20000;
          ec = 30;
          mpf = 2000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 22749.99) {
          msc = 20000;
          ec = 30;
          mpf = 2500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 23249.99) {
          msc = 20000;
          ec = 30;
          mpf = 3000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 23749.99) {
          msc = 20000;
          ec = 30;
          mpf = 3500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 24249.99) {
          msc = 20000;
          ec = 30;
          mpf = 4000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 24749.99) {
          msc = 20000;
          ec = 30;
          mpf = 4500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 25249.99) {
          msc = 20000;
          ec = 30;
          mpf = 5000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 25749.99) {
          msc = 20000;
          ec = 30;
          mpf = 5500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 26249.99) {
          msc = 20000;
          ec = 30;
          mpf = 6000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 26749.99) {
          msc = 20000;
          ec = 30;
          mpf = 6500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 27249.99) {
          msc = 20000;
          ec = 30;
          mpf = 7000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 27749.99) {
          msc = 20000;
          ec = 30;
          mpf = 7500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 28249.99) {
          msc = 20000;
          ec = 30;
          mpf = 8000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 28749.99) {
          msc = 20000;
          ec = 30;
          mpf = 8500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 29249.99) {
          msc = 20000;
          ec = 30;
          mpf = 9000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else if (formData.monthlySalary <= 29749.99) {
          msc = 20000;
          ec = 30;
          mpf = 9500;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        } else {
          msc = 20000;
          ec = 30;
          mpf = 10000;
          tmc = eval(msc * contri_rate + ec + mpf * contri_rate);
          final_sss = formData.monthlySalary - tmc;
          setSssDeductionAmt(tmc.toFixed(2));
        }
      }

      if (formData.isGsisMember === "Employee") {
        percent_gsis = 0.09;
        total_gsis = eval(formData.monthlySalary * percent_gsis);
        setGsisDeductionAmt(eval(total_gsis.toFixed(2)));
      } else if (formData.isGsisMember === "Employer") {
        percent_gsis = 0.12;
        total_gsis = eval(formData.monthlySalary * percent_gsis);
        setGsisDeductionAmt(eval(total_gsis.toFixed(2)));
      }

      if (formData.isPhilHealthMember === "Philhealth Member") {
        ph_total = eval(formData.monthlySalary * 0.05);
        setPhilHealthDeductionAmt(eval(ph_total.toFixed(2)));
      }

      setFormData({ ...formData, finalSalary: taxedIncome.toFixed(2) });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <ProjectedTax
        taxedSalary={eval(formData.monthlySalary - sssDeductionAmt - gsisDeductionAmt - philHealthDeductionAmt)}
      />
      <article className="bg-gradient-to-r from-gray-400 to-gray-300 py-16 w-full h-[calc(60vh+900px)] lg:h-[calc(50vh+700px)] px-6 rounded-t-[30px] flex flex-col gap-4">
        <h2 className="text-heading-3 font-bold text-white tracking-f-small py-5">
          Calculate<span className="text-gray-800"> Tax</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="amount">
              MONTHLY SALARY <span className="text-gray-800">*</span>
            </label>
            <div className="relative">
              <input
                className="primary-input pl-8 text-white bg-gray-200"
                name="amount"
                type="text"
                placeholder="0"
                value={formData.monthlySalary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthlySalary: Number(e.target.value),
                  })
                }
                required
              />
              <p className="absolute left-2 top-2 text-gray-800">₱</p>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="primary-label text-gray-800">
              SSS Membership Status <span className="text-gray-800">*</span>
            </label>
            <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-2">
              <div className="flex-row-reverse flex items-center gap-4 ">
                <input
                  type="radio"
                  id="not-member"
                  name="sss-membership"
                  value="Not Member"
                  className="hidden peer "
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      monthlySalary: parseFloat(e.target.value) || "",
                    }))
                  }
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="not-member"
                >
                  Not Member
                </label>
              </div>
              <div className="flex-row-reverse flex items-center gap-4">
                <input
                  type="radio"
                  id="household"
                  name="sss-membership"
                  value="Household"
                  onChange={(e) =>
                    setFormData({ ...formData, isSssMember: e.target.value })
                  }
                  className="hidden peer"
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="household"
                >
                  Household
                </label>
              </div>
              <div className="flex-row-reverse flex items-center gap-4">
                <input
                  type="radio"
                  id="employee"
                  name="sss-membership"
                  value="Employee"
                  onChange={(e) =>
                    setFormData({ ...formData, isSssMember: e.target.value })
                  }
                  className="hidden peer"
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="employee"
                >
                  Employee
                </label>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="primary-label text-gray-800">
              GSIS Membership Status <span className="text-secondary">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex-row-reverse flex items-center">
                <input
                  type="radio"
                  id="gsis-not-member"
                  name="gsis-membership"
                  className="hidden peer"
                  value="Not Member"
                  onChange={(e) =>
                    setFormData({ ...formData, isGsisMember: e.target.value })
                  }
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="gsis-not-member"
                >
                  Not Member
                </label>
              </div>
              <div className="flex-row-reverse flex items-center">
                <input
                  type="radio"
                  id="gsis-employee"
                  name="gsis-membership"
                  value="Employee"
                  onChange={(e) =>
                    setFormData({ ...formData, isGsisMember: e.target.value })
                  }
                  className="hidden peer"
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="gsis-employee"
                >
                  EMPLOYEE
                </label>
              </div>
              <div className="flex-row-reverse flex items-center">
                <input
                  type="radio"
                  id="gsis-employer"
                  name="gsis-membership"
                  className="hidden peer"
                  value="Employer"
                  onChange={(e) =>
                    setFormData({ ...formData, isGsisMember: e.target.value })
                  }
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="gsis-employer"
                >
                  EMPLOYER
                </label>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="primary-label text-gray-800">
              PhilHealth Membership Status{" "}
              <span className="text-gray-800">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex-row-reverse flex items-center">
                <input
                  type="radio"
                  id="philhealth-not-member"
                  name="philhealth-membership"
                  className="hidden peer"
                  value="Not Member"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPhilHealthMember: e.target.value,
                    })
                  }
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="philhealth-not-member"
                >
                  Not Member
                </label>
              </div>
              <div className="flex-row-reverse flex items-center">
                <input
                  type="radio"
                  id="philhealth-member"
                  name="philhealth-membership"
                  value="Philhealth Member"
                  className="hidden peer"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPhilHealthMember: e.target.value,
                    })
                  }
                  required
                />
                <label
                  className="primary-label font-semibold text-gray-800 p-4 w-full bg-gray-200 rounded-md text-center uppercase border border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white duration-300"
                  htmlFor="philhealth-member"
                >
                  I&apos;m a Member
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="primary-btn bg-gray-800 text-white">
            Calculate
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <CardTax recipient="SSS" taxedValue={sssDeductionAmt} img={sssLogo} />
          <CardTax
            recipient="GSIS"
            taxedValue={gsisDeductionAmt}
            img={gsisLogo}
          />
          <CardTax recipient="PhilHealth" taxedValue={philHealthDeductionAmt} img={philhealthLogo} />
          <CardTax recipient="Total Accumulated Tax" taxedValue={eval(sssDeductionAmt + gsisDeductionAmt + philHealthDeductionAmt)} img={taxLogo} />
        </div>
      </article>
    </section>
  );
}

export default TaxCalculator;
