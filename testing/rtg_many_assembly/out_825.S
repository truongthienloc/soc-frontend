.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 102 
		addi    x24 , x0 , 131 
		sltiu   x11 , x20 , 131 
		bltu    x20 , x24 , Less_i 
		bgeu    x20 , x24 , Bigger_i 
Less_i:
		ori     x8 , x20 , 124 
		sub     x1 , x24 , x20 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x7 , x0 , 0 
		beq     x1 , x7 , Pass 
Bigger_i:
		ori     x8 , x20 , 46 
		sub     x1 , x24 , x20 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x7 , x0 , 0 
		beq     x1 , x7 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
