.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 137 
		addi    x20 , x0 , 166 
		sltiu   x17 , x16 , 166 
		bltu    x16 , x20 , Less_i 
		bgeu    x16 , x20 , Bigger_i 
Less_i:
		ori     x15 , x16 , 124 
		sub     x1 , x20 , x16 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x31 , x0 , 0 
		beq     x1 , x31 , Pass 
Bigger_i:
		ori     x15 , x16 , 175 
		sub     x1 , x20 , x16 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x31 , x0 , 0 
		beq     x1 , x31 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
