import { auth } from "@/auth";

export default async function Dashboard() {
    const session = await auth();

    return (
        <div>
            <p>
                navbar Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto ex dicta reprehenderit veniam quo reiciendis ea
                inventore asperiores, ad culpa excepturi doloribus modi iste,
                cum adipisci doloremque aspernatur laborum aut autem nam
                voluptatum corporis velit sequi suscipit! Temporibus rerum,
                dolores non ipsum ad qui! Voluptatibus ratione explicabo
                excepturi sed cupiditate!
            </p>
        </div>
    );
}
