.text

#The program checks the ALU instruction in I_type

Main:
		addi    x8 , x0 , 72 
		addi    x14 , x0 , -2048 
		slti    x31 , x8 , 62 
		bltu    x8 , x14 , Less_i 
		bgeu    x8 , x14 , Bigger_i 
Less_i:
		ori     x16 , x8 , 191 
		sub     x10 , x14 , x8 
		srai    x10 , x10 , 3 
		and     x10 , x10 , x0 
		addi    x3 , x0 , 0 
		beq     x10 , x3 , Pass 
Bigger_i:
		ori     x16 , x8 , 58 
		sub     x10 , x14 , x8 
		srai    x10 , x10 , 1 
		and     x10 , x10 , x0 
		addi    x3 , x0 , 0 
		beq     x10 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
