.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 100 
		addi    x29 , x0 , 156 
		sltiu   x13 , x21 , 156 
		bltu    x21 , x29 , Less_i 
		bgeu    x21 , x29 , Bigger_i 
Less_i:
		ori     x18 , x21 , 125 
		sub     x4 , x29 , x21 
		srai    x4 , x4 , 2 
		and     x4 , x4 , x0 
		addi    x3 , x0 , 0 
		beq     x4 , x3 , Pass 
Bigger_i:
		ori     x18 , x21 , 145 
		sub     x4 , x29 , x21 
		srai    x4 , x4 , 3 
		and     x4 , x4 , x0 
		addi    x3 , x0 , 0 
		beq     x4 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
