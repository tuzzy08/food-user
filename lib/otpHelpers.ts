type SendOtpResponse = {
	pinId: string;
	t0: string;
	smsStatus: string;
};

type VerifyOtpResponse = {
	access_token: string;
	pinId: string;
	verified: boolean;
	msisdn: string;
};

export async function sendOtpToPhone(phone: string) {
	return fetch(`${process.env.EXPO_API_URL}/sendOtp`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone,
		}),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Error in network request');
			}
			return res.json();
		})
		.then((data) => {
			return data as SendOtpResponse;
		});
}

export async function verifyOtp(phone: string, pinId: string, otp: string) {
	return fetch(`${process.env.EXPO_API_URL}/verifyOtp`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone,
			pinId,
			otp,
		}),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Error in network request');
			}
			return res.json();
		})
		.then((data) => {
			return data as VerifyOtpResponse;
		});
}
