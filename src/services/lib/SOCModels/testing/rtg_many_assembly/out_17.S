.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 35 
		addi    x13 , x0 , -2048 
		slti    x5 , x27 , 691 
		bltu    x27 , x13 , Less_i 
		bgeu    x27 , x13 , Bigger_i 
Less_i:
		ori     x4 , x27 , 14 
		sub     x22 , x13 , x27 
		srai    x22 , x22 , 2 
		and     x22 , x22 , x0 
		addi    x1 , x0 , 0 
		beq     x22 , x1 , Pass 
Bigger_i:
		ori     x4 , x27 , 149 
		sub     x22 , x13 , x27 
		srai    x22 , x22 , 0 
		and     x22 , x22 , x0 
		addi    x1 , x0 , 0 
		beq     x22 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
