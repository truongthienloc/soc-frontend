.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 37 
		addi    x10 , x0 , 111 
		sltiu   x20 , x13 , 111 
		bltu    x13 , x10 , Less_i 
		bgeu    x13 , x10 , Bigger_i 
Less_i:
		ori     x5 , x13 , 75 
		sub     x30 , x10 , x13 
		srai    x30 , x30 , 3 
		and     x30 , x30 , x0 
		addi    x1 , x0 , 0 
		beq     x30 , x1 , Pass 
Bigger_i:
		ori     x5 , x13 , 87 
		sub     x30 , x10 , x13 
		srai    x30 , x30 , 2 
		and     x30 , x30 , x0 
		addi    x1 , x0 , 0 
		beq     x30 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
