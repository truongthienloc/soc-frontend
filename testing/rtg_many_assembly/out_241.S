.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , -2048 
		addi    x6 , x0 , 45 
		sltu    x1 , x27 , x6 
		bltu    x27 , x6 , Less_i 
		bgeu    x27 , x6 , Bigger_i 
Less_i:
		ori     x23 , x27 , 35 
		sub     x4 , x6 , x27 
		srai    x4 , x4 , 2 
		and     x4 , x4 , x0 
		addi    x24 , x0 , 0 
		beq     x4 , x24 , Pass 
Bigger_i:
		ori     x23 , x27 , 186 
		sub     x4 , x6 , x27 
		srai    x4 , x4 , 1 
		and     x4 , x4 , x0 
		addi    x24 , x0 , 0 
		beq     x4 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
