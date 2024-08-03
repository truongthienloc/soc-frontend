.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 162 
		addi    x19 , x0 , -2048 
		slti    x11 , x27 , 668 
		bltu    x27 , x19 , Less_i 
		bgeu    x27 , x19 , Bigger_i 
Less_i:
		ori     x4 , x27 , 62 
		sub     x2 , x19 , x27 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x8 , x0 , 0 
		beq     x2 , x8 , Pass 
Bigger_i:
		ori     x4 , x27 , 14 
		sub     x2 , x19 , x27 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x8 , x0 , 0 
		beq     x2 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
