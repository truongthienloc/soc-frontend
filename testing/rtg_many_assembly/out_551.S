.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 25 
		addi    x22 , x0 , -2048 
		slti    x14 , x12 , 406 
		bltu    x12 , x22 , Less_i 
		bgeu    x12 , x22 , Bigger_i 
Less_i:
		ori     x4 , x12 , 162 
		sub     x7 , x22 , x12 
		srai    x7 , x7 , 0 
		and     x7 , x7 , x0 
		addi    x13 , x0 , 0 
		beq     x7 , x13 , Pass 
Bigger_i:
		ori     x4 , x12 , 159 
		sub     x7 , x22 , x12 
		srai    x7 , x7 , 0 
		and     x7 , x7 , x0 
		addi    x13 , x0 , 0 
		beq     x7 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
