.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 91 
		addi    x3 , x0 , -2048 
		slti    x16 , x18 , 97 
		bltu    x18 , x3 , Less_i 
		bgeu    x18 , x3 , Bigger_i 
Less_i:
		ori     x30 , x18 , 148 
		sub     x15 , x3 , x18 
		srai    x15 , x15 , 1 
		and     x15 , x15 , x0 
		addi    x14 , x0 , 0 
		beq     x15 , x14 , Pass 
Bigger_i:
		ori     x30 , x18 , 103 
		sub     x15 , x3 , x18 
		srai    x15 , x15 , 3 
		and     x15 , x15 , x0 
		addi    x14 , x0 , 0 
		beq     x15 , x14 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
