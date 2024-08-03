.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 48 
		addi    x25 , x0 , -2048 
		slti    x3 , x31 , 238 
		bltu    x31 , x25 , Less_i 
		bgeu    x31 , x25 , Bigger_i 
Less_i:
		ori     x2 , x31 , 111 
		sub     x9 , x25 , x31 
		srai    x9 , x9 , 2 
		and     x9 , x9 , x0 
		addi    x21 , x0 , 0 
		beq     x9 , x21 , Pass 
Bigger_i:
		ori     x2 , x31 , 172 
		sub     x9 , x25 , x31 
		srai    x9 , x9 , 1 
		and     x9 , x9 , x0 
		addi    x21 , x0 , 0 
		beq     x9 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
