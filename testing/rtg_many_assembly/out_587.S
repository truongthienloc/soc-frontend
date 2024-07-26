.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 58 
		addi    x5 , x0 , 128 
		sltiu   x25 , x15 , 128 
		bltu    x15 , x5 , Less_i 
		bgeu    x15 , x5 , Bigger_i 
Less_i:
		ori     x3 , x15 , 158 
		sub     x6 , x5 , x15 
		srai    x6 , x6 , 2 
		and     x6 , x6 , x0 
		addi    x30 , x0 , 0 
		beq     x6 , x30 , Pass 
Bigger_i:
		ori     x3 , x15 , 69 
		sub     x6 , x5 , x15 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x30 , x0 , 0 
		beq     x6 , x30 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
