.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 88 
		addi    x17 , x0 , -2048 
		slti    x9 , x15 , 855 
		bltu    x15 , x17 , Less_i 
		bgeu    x15 , x17 , Bigger_i 
Less_i:
		ori     x5 , x15 , 127 
		sub     x25 , x17 , x15 
		srai    x25 , x25 , 0 
		and     x25 , x25 , x0 
		addi    x18 , x0 , 0 
		beq     x25 , x18 , Pass 
Bigger_i:
		ori     x5 , x15 , 20 
		sub     x25 , x17 , x15 
		srai    x25 , x25 , 3 
		and     x25 , x25 , x0 
		addi    x18 , x0 , 0 
		beq     x25 , x18 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
