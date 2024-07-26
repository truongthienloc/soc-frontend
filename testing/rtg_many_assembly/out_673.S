.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 158 
		addi    x5 , x0 , 147 
		addi    x22 , x0 , 169 
		bltu    x31 , x5 , Less_i 
		bgeu    x31 , x5 , Bigger_i 
Less_i:
		addi    x18 , x22 , 93 
		andi    x25 , x22 , 29 
		add     x25 , x25 , x18 
		srli    x25 , x25 , 3 
		addi    x1 , x0 , 33 
		bne     x25 , x1 , Fail 
Bigger_i:
		ori     x18 , x22 , 154 
		xori    x25 , x22 , 65 
		add     x25 , x25 , x18 
		srai    x25 , x25 , 2 
		addi    x1 , x0 , 104 
		bne     x25 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
