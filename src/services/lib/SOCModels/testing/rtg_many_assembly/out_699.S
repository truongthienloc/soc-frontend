.text

#The program checks the ALU instruction in I_type

Main:
		addi    x25 , x0 , 35 
		addi    x2 , x0 , 34 
		sltu    x31 , x25 , x2 
		bltu    x25 , x2 , Less_i 
		bgeu    x25 , x2 , Bigger_i 
Less_i:
		ori     x4 , x25 , 94 
		sub     x13 , x2 , x25 
		srai    x13 , x13 , 4 
		and     x13 , x13 , x0 
		addi    x15 , x0 , 0 
		beq     x13 , x15 , Pass 
Bigger_i:
		ori     x4 , x25 , 14 
		sub     x13 , x2 , x25 
		srai    x13 , x13 , 0 
		and     x13 , x13 , x0 
		addi    x15 , x0 , 0 
		beq     x13 , x15 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
