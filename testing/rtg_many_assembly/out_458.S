.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 137 
		addi    x15 , x0 , -2048 
		slti    x29 , x12 , 420 
		bltu    x12 , x15 , Less_i 
		bgeu    x12 , x15 , Bigger_i 
Less_i:
		ori     x27 , x12 , 43 
		sub     x8 , x15 , x12 
		srai    x8 , x8 , 0 
		and     x8 , x8 , x0 
		addi    x17 , x0 , 0 
		beq     x8 , x17 , Pass 
Bigger_i:
		ori     x27 , x12 , 174 
		sub     x8 , x15 , x12 
		srai    x8 , x8 , 3 
		and     x8 , x8 , x0 
		addi    x17 , x0 , 0 
		beq     x8 , x17 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
