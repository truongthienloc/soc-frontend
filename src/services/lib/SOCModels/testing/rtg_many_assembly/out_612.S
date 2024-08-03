.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 24 
		addi    x17 , x0 , 25 
		sltiu   x9 , x24 , 25 
		bltu    x24 , x17 , Less_i 
		bgeu    x24 , x17 , Bigger_i 
Less_i:
		ori     x21 , x24 , 187 
		sub     x18 , x17 , x24 
		srai    x18 , x18 , 0 
		and     x18 , x18 , x0 
		addi    x16 , x0 , 0 
		beq     x18 , x16 , Pass 
Bigger_i:
		ori     x21 , x24 , 37 
		sub     x18 , x17 , x24 
		srai    x18 , x18 , 4 
		and     x18 , x18 , x0 
		addi    x16 , x0 , 0 
		beq     x18 , x16 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
