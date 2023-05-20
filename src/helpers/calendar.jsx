import dayjs from "dayjs";

export const generateDate =(
    month=dayjs().month(), 
    year=dayjs().year()) =>
{
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayofDate=  [];
    //create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        arrayofDate.push({
            currentMonth: false,
            date: firstDateOfMonth.day(i)
        });
    }

    
    //generate current date
    for (let i = firstDateOfMonth.date(); i <=lastDateOfMonth.date(); i++) {
        arrayofDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today: firstDateOfMonth.date(i).toDate().toDateString()=== dayjs().toDate().toDateString()
        });
    }

    //create sufix date
    const remaining = 42-arrayofDate.length;

    for (let i = lastDateOfMonth.date()+1; i <=lastDateOfMonth.date()+remaining; i++) {
        arrayofDate.push({
            currentMonth: false,
            date: firstDateOfMonth.date(i)
        });
    }

    return arrayofDate;
}

export const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio", 
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];