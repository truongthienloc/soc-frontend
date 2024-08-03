.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 62 
		addi    x31 , x0 , -2048 
		slti    x30 , x22 , 292 
		bltu    x22 , x31 , Less_i 
		bgeu    x22 , x31 , Bigger_i 
Less_i:
		ori     x21 , x22 , 49 
		sub     x8 , x31 , x22 
		srai    x8 , x8 , 3 
		and     x8 , x8 , x0 
		addi    x3 , x0 , 0 
		beq     x8 , x3 , Pass 
Bigger_i:
		ori     x21 , x22 , 22 
		sub     x8 , x31 , x22 
		srai    x8 , x8 , 3 
		and     x8 , x8 , x0 
		addi    x3 , x0 , 0 
		beq     x8 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
