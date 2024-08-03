.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 86 
		addi    x16 , x0 , 69 
		sltiu   x27 , x22 , 69 
		bltu    x22 , x16 , Less_i 
		bgeu    x22 , x16 , Bigger_i 
Less_i:
		ori     x26 , x22 , 172 
		sub     x12 , x16 , x22 
		srai    x12 , x12 , 0 
		and     x12 , x12 , x0 
		addi    x21 , x0 , 0 
		beq     x12 , x21 , Pass 
Bigger_i:
		ori     x26 , x22 , 79 
		sub     x12 , x16 , x22 
		srai    x12 , x12 , 2 
		and     x12 , x12 , x0 
		addi    x21 , x0 , 0 
		beq     x12 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
