.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 55 
		addi    x24 , x0 , 154 
		sltiu   x4 , x26 , 154 
		bltu    x26 , x24 , Less_i 
		bgeu    x26 , x24 , Bigger_i 
Less_i:
		ori     x16 , x26 , 162 
		sub     x19 , x24 , x26 
		srai    x19 , x19 , 1 
		and     x19 , x19 , x0 
		addi    x12 , x0 , 0 
		beq     x19 , x12 , Pass 
Bigger_i:
		ori     x16 , x26 , 60 
		sub     x19 , x24 , x26 
		srai    x19 , x19 , 2 
		and     x19 , x19 , x0 
		addi    x12 , x0 , 0 
		beq     x19 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
