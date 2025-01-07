.text

#The program finds the value of fibonacci 

Fibo:
		addi    x21 , x0 , 10 
		addi    x5 , x0 , 1 
		addi    x11 , x0 , 1 
		addi    x16 , x0 , 3 
		beq     x21 , x0 , Result0 
		beq     x21 , x11 , Result1 
Loop: 
		blt     x21 , x16 , Result 
		add     x28 , x5 , x11 
		addi    x5 , x11 , 0 
		addi    x11 , x28 , 0 
		addi    x16 , x16 , 1 
		jal     x0 , Loop 
Result0:
		addi    x28 , x0 , 0 
		addi    x29 , x0 , 0 
		bne     x28 , x29 , Fail 
Result1:
		addi    x28 , x0 , 1 
		addi    x25 , x0 , 1 
		bne     x28 , x25 , Fail 
Result:
		addi    x2 , x0 , 55 
		bne     x28 , x2 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
