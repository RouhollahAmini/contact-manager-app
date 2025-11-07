import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required('نام و نام خانوادگی الزامی می باشد'),
    mobile: Yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required('شماره موبایل الزامی می باشد')
        .typeError('شماره موبایل معتبر نیست'),
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی می باشد'),
    job: Yup.string().nullable(),
    group: Yup.string().required('گروه الزامی می باشد'),
    image: Yup.string().required('عکس الزامی می باشد'),
});