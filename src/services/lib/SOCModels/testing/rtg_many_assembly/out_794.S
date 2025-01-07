.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , -2048 
		addi    x13 , x0 , 33 
		sltu    x21 , x6 , x13 
		bltu    x6 , x13 , Less_i 
		bgeu    x6 , x13 , Bigger_i 
Less_i:
		ori     x9 , x6 , 117 
		sub     x4 , x13 , x6 
		srai    x4 , x4 , 4 
		and     x4 , x4 , x0 
		addi    x3 , x0 , 0 
		beq     x4 , x3 , Pass 
Bigger_i:
		ori     x9 , x6 , 52 
		sub     x4 , x13 , x6 
		srai    x4 , x4 , 0 
		and     x4 , x4 , x0 
		addi    x3 , x0 , 0 
		beq     x4 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
