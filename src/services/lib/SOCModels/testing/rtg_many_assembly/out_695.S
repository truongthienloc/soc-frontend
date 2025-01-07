.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 18 
		addi    x23 , x0 , -2048 
		slti    x27 , x4 , 943 
		bltu    x4 , x23 , Less_i 
		bgeu    x4 , x23 , Bigger_i 
Less_i:
		ori     x10 , x4 , 6 
		sub     x14 , x23 , x4 
		srai    x14 , x14 , 1 
		and     x14 , x14 , x0 
		addi    x9 , x0 , 0 
		beq     x14 , x9 , Pass 
Bigger_i:
		ori     x10 , x4 , 107 
		sub     x14 , x23 , x4 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x9 , x0 , 0 
		beq     x14 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
