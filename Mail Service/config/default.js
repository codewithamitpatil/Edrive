module.exports = {
	host: "localhost",
	port: 5003,
	// for cors
	origin: "*",
	baseUrl: "http://localhost:5003",
rabitUri: '',
  // for nodemailer
	nodemailerOptions: {
		service: "gmail",
		auth: {
			user: "amitwebdev2019@gmail.com",
			pass: "",
		},
		tls: {
			rejectUnauthorized: false,
		},
	},

	adminMail: "amitwebdev2019@gmail.com",
};
