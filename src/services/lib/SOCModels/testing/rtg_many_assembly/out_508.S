.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 156 
		addi    x15 , x0 , 125 
		sltiu   x22 , x9 , 125 
		bltu    x9 , x15 , Less_i 
		bgeu    x9 , x15 , Bigger_i 
Less_i:
		ori     x4 , x9 , 67 
		sub     x5 , x15 , x9 
		srai    x5 , x5 , 0 
		and     x5 , x5 , x0 
		addi    x12 , x0 , 0 
		beq     x5 , x12 , Pass 
Bigger_i:
		ori     x4 , x9 , 154 
		sub     x5 , x15 , x9 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x12 , x0 , 0 
		beq     x5 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
