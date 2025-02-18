import React from 'react'

export default function Header() {
  const route = useRouter();

  const onClickRemove = async () => {
    await removeToken();
    route.push("/sign-in");
  };

  return (
    <div className={header.header_layout}>Header
    </div>
  );
}
