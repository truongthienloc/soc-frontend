.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 8 
		addi    x12 , x0 , -2048 
		slti    x26 , x31 , 2 
		bltu    x31 , x12 , Less_i 
		bgeu    x31 , x12 , Bigger_i 
Less_i:
		ori     x14 , x31 , 54 
		sub     x2 , x12 , x31 
		srai    x2 , x2 , 0 
		and     x2 , x2 , x0 
		addi    x27 , x0 , 0 
		beq     x2 , x27 , Pass 
Bigger_i:
		ori     x14 , x31 , 187 
		sub     x2 , x12 , x31 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x27 , x0 , 0 
		beq     x2 , x27 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
